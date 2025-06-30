export default ({
  value = {},
  ...props
}: any) => {
  if (['text', 'name', 'phone', 'email', 'password', 'idNo', 'textPlate'].includes(value.type)) return <FormTextItem  {...props} />;
  if (['number'].includes(value.type)) return <FormNumberItem  {...props} />;
  if (['number'].includes(value.type)) return <FormNumberItem  {...props} precision={2} ratio={100} unit='元' />;
  if (['image', 'head', 'images'].includes(value.type)) return <FormImageItem  {...props} />;
  if (['radio'].includes(value.type)) return <FormRadioItem  {...props} />;
  if (['checkbox'].includes(value.type)) return <FormCheckboxItem  {...props} />;
  return <FormPlainItem  {...props} />;
};
