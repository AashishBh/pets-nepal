function formatName(productName) {
  if(productName.length > 21) {
    return (
      productName.slice(0, 19) + '...'
    );
  }
  return productName;
}

export { formatName };