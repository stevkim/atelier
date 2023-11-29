import React from 'react'
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddReviewForm from '../components/AddReviewForm.jsx';
import AddReviewErrorMessages from '../components/AddReviewErrorMessages.jsx';
import AddReviewUserImages from '../components/AddReviewUserImages.jsx';
import AddStarRating from '../utils/AddStarRating.jsx';
import { convertFile, convertFilesToDataURL, postRequirements } from '../lib/formUtilityFunctions.js';

describe('Utility functions', () => {
  test('Correctly converts files to strings', async () => {
    const mockSingleFile = new File(['test'], 'test.png', { type: 'image/png'});
    const mockFiles = {
      1: new File(['foo'], 'foo.png', { type: 'image/png'}),
      2: new File(['bar'], 'bar.png', { type: 'image/png'})
    };

    const convertedFile = await convertFile(mockSingleFile);
    expect(typeof convertedFile).toEqual('string');
    const singleId = convertedFile.slice(0, 10)
    await render(<img data-testid={singleId} src={singleId} />);
    expect(await screen.getByTestId(singleId)).toBeInTheDocument();
    cleanup();

    const convertedFiles = await convertFilesToDataURL(mockFiles);

    expect(Array.isArray(convertedFiles)).toEqual(true);
    convertedFiles.forEach(async (file) => {
      expect(typeof file).toEqual('string');

      const fileId = file.slice(0, 10)
      await render(<img data-testid={fileId} src={file} />);
      expect(await screen.getByTestId(fileId)).toBeInTheDocument();

      cleanup();
    });
  });

  test('Correctly checks if any required fields are empty', () => {
    const mockData1 = {
      product_id: 0,
      rating: 0,
      summary: '',
      body: '',
      recommend: null,
      name: '',
      email: '',
      characteristics: {},
      photos: [],
    }
    const mockData2 = {
      product_id: 120,
      rating: 3,
      summary: 'Test summary',
      body: 'Test body',
      recommend: true,
      name: 'Test',
      email: 'test@email.com',
      characteristics: {},
      photos: [],
    }
    const mockData3 = {
      product_id: 0,
      rating: 0,
      summary: 'Fail test summary',
      body: '',
      recommend: true,
      name: 'Fail test name',
      email: 'fail@email.com',
      characteristics: {},
      photos: ['Testing'],
    }
    expect(postRequirements(mockData1)).toEqual(false);
    expect(postRequirements(mockData2)).toEqual(true);
    expect(postRequirements(mockData3)).toEqual(false);
  });
})

describe('Add review form', () => {
  const mockSetModal = jest.fn();
  const mockProductName = 'Shoes';
  const mockData = {
    product_id: '2000',
    characteristics: {
      "Fit": {
          "id": 135228,
          "value": "3.1590909090909091"
      },
      "Length": {
          "id": 135229,
          "value": "3.1590909090909091"
      },
      "Comfort": {
          "id": 135230,
          "value": "3.3829787234042553"
      },
      "Quality": {
          "id": 135231,
          "value": "3.6086956521739130"
      },
    },
  };

  beforeEach(async () => {
    await render(<AddReviewForm data={mockData} setModal={mockSetModal} productName={mockProductName} />);
  })

  test('Correctly displays the product passed in', async () => {
    expect(await screen.findByText('Write Your Review')).toBeInTheDocument();
    expect(await screen.findByText(`About the [${mockProductName}]`)).toBeInTheDocument();

    const characteristicsList = Object.keys(mockData.characteristics);
    for (let i = 0; i < characteristicsList.length; i++) {
      expect(await screen.findByText(characteristicsList[i])).toBeInTheDocument();
    };
  });

  test('Correctly renders sub tags', async () => {
    const subTags = document.getElementsByTagName('sub');
    expect(subTags.length).toEqual(2);
  })

  test('Modal button functionality exists', async () => {
    fireEvent.click(await screen.findByTestId('close-modal'));
    expect(mockSetModal).toHaveBeenCalled();
  });

  test('Correctly displays error messages', async () => {
    const mockErrors = ['Test-one', 'Test-two', 'Test-three'];
    const { container } = await render(<AddReviewErrorMessages messages={mockErrors} />)

    const list = container.getElementsByTagName('ul')[0];
    expect(list.childElementCount).toEqual(mockErrors.length);
    mockErrors.forEach(async (msg) => {
      expect(await screen.getByText(msg)).toBeInTheDocument();
    })
  });

  describe('Form Inputs', () => {
    test('Username input updates correctly', async () => {
      const usernameInput = await screen.findByPlaceholderText('Example: jackson11!');
      expect(usernameInput).toBeInTheDocument();

      fireEvent.change(usernameInput, { target: { value: 'Test username' }});
      expect(usernameInput.value).toEqual('Test username');
    });

    test('Email input updates correctly', async () => {
      const emailInput = await screen.findByPlaceholderText('Example: jackson11@email.com');
      expect(emailInput).toBeInTheDocument();

      fireEvent.change(emailInput, { target: { value: 'test@email.com' }});
      expect(emailInput.value).toEqual('test@email.com');
      expect(emailInput.checkValidity()).toEqual(true);

      fireEvent.change(emailInput, { target: { value: 'testing' }});
      expect(emailInput.value).toEqual('testing');
      expect(emailInput.checkValidity()).toEqual(false);
    });

    test('Summary input updates correctly', async () => {
      const summaryInput = await screen.findByPlaceholderText('Example: Best Purchase Ever!');
      expect(summaryInput).toBeInTheDocument();

      fireEvent.change(summaryInput, { target: { value: 'testing' }});
      expect(summaryInput.value).toEqual('testing');
      expect(summaryInput.checkValidity()).toEqual(true);
    });

    test('Body/textarea input updates correctly', async () => {
      const bodyInput = await screen.findByPlaceholderText('Why did you like the product or not?');
      expect(bodyInput).toBeInTheDocument();

      fireEvent.change(bodyInput, { target: { value: 'Test' }});
      expect(bodyInput.value).toEqual('Test');

      fireEvent.change(bodyInput, { target: { value: 'Test'.repeat(20) }});
      expect(await screen.findByText('Minimum reached')).toBeInTheDocument();
    });

    test('Image input field exists', () => {
      expect(document.querySelector('input[type=file]')).toBeInTheDocument();
    });
  });
});

describe('Characteristics', () => {
  const mockData = [
    {
      product_id: '2000',
      characteristics: {
        "Fit": {
            "id": 135228,
            "value": "3.1590909090909091"
        },
        "Length": {
            "id": 135229,
            "value": "3.1590909090909091"
        },
        "Comfort": {
            "id": 135230,
            "value": "3.3829787234042553"
        },
        "Quality": {
            "id": 135231,
            "value": "3.6086956521739130"
        },
      },
    },
    {
      product_id: '2020',
      characteristics: {
        "Quality": {
            "id": 135228,
            "value": "3.1590909090909091"
        },
        "Size": {
            "id": 135229,
            "value": "3.1590909090909091"
        },
        "Width": {
            "id": 135230,
            "value": "3.3829787234042553"
        },
        "Comfort": {
            "id": 135231,
            "value": "3.6086956521739130"
        },
      },
    }
  ];

  test('Correctly renders forms based on data characteristics', () => {
    mockData.forEach(async (data) => {
      render(await <AddReviewForm data={data} productName={data.product_id} />);
      const properties = Object.keys(data.characteristics);
      expect(await screen.findByText(data.product_id)).toBeInTheDocument();
      properties.forEach(async (property) => {
        expect(await screen.findByText(property)).toBeInTheDocument();
      })
      cleanup();
    });
  });
});

describe('User Image upload', () => {
  test('Correctly displays user images when selected', async () => {
    const mockFiles = [
      'https://fastly.picsum.photos/id/30/200/300.jpg?grayscale&hmac=hvPMSm7AGBeuarU1zi90MHYIdKsGIl5IdBeuHJXS5HE',
      'https://fastly.picsum.photos/id/61/200/300.jpg?grayscale&hmac=4oR0xhApjCw_YO68_zxzspKZ11oBKhzpBYNnJ-oBIQ4'
    ];
    render(await <AddReviewUserImages photos={mockFiles} />);

    const images = await screen.findByTestId('user-upload');
    expect(images.childElementCount).toEqual(2);
  });
})

describe('Star rating Input', () => {
  const setRating = jest.fn();
  test('Correctly invokes the passed in function', async () => {
    render(await <AddStarRating setOverallRating={setRating} />);

    const stars = await screen.findByTestId('star-rating-input');
    expect(stars.childElementCount).toEqual(5);

    for (let i = 0; i < stars.children.length; i++) {
      fireEvent.click(stars.children[i]);
      expect(setRating).toHaveBeenCalledTimes(i + 1);
    };
  })
});