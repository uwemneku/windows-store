export function scrollItemIntoContainer(
  item: HTMLElement | null,
  container: HTMLElement | null
) {
  if (item && container) {
    const { left, right } = item?.getBoundingClientRect();
    const isInView = left >= 100 && right <= window.innerWidth;
    if (!isInView) {
      const scrollThumbWidth = 30;
      container.scrollBy({
        behavior: "smooth",
        left: right - window.innerWidth + scrollThumbWidth,
      });
    }
  }
}
