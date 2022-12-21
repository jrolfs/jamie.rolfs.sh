const regExpRegExp = /^\/(?<pattern>.+)\/(?<flags>[dumysig]*)$/;

export const parseRegExp = (value: string) => {
  if (!regExpRegExp.test(value)) return value;

  const { pattern, flags } = regExpRegExp.exec(value)!.groups!;

  return new RegExp(pattern, flags);
};
