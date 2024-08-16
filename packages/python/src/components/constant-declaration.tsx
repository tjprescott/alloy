export interface ConstantDeclarationModel {
  name: string;
  value: string | number | undefined;
}
  
export function ConstantDeclaration({ name, value }: ConstantDeclarationModel) {
  // COMMENT: Can't use `useNamePolicy` here because I can't query strings directly.
  // TODO: Should convert to snake_case, uppercase
  const constantName = name.toUpperCase();
  let valExpression = "";
  if (typeof value === "string") {
    valExpression = ` = "${value}"`;
  } else if (typeof value === "number") {
    valExpression = ` = ${value}`;
  }
  return (
    <>
      {constantName}
      {valExpression}
    </>
  );
}