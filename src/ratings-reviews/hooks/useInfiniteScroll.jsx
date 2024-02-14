const useInfiniteScroll = (el, setScroll, increment) => {
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = el.current;

    // to display the back-to-top button
    scrollTop + clientHeight >= 1200 ? setScroll(true) : setScroll(false);

    // if the user's viewport is 300px from the bottom, invoke the increment function
    if (scrollTop + clientHeight > scrollHeight - 300) {
      increment();
    }
  }

  return handleScroll;
}

export default useInfiniteScroll;
