const nullthrows = (v: any) => {
  if (v == null) throw new Error("it's a null");
  return v;
}

export default nullthrows

