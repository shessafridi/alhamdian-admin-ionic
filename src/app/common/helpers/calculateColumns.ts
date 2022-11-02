interface AppColumnDef {
  name: string;
  hideOn?: string[];
}

export const calculateVisableColumns = (
  breakpoints: {
    xsm: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
    xlg: boolean;
  },
  columnDef: AppColumnDef[]
) => {
  let temp = [...columnDef];
  if (breakpoints.xsm)
    temp = temp.filter((d) => !d.hideOn || !d.hideOn.includes('xsm'));
  if (breakpoints.sm)
    temp = temp.filter((d) => !d.hideOn || !d.hideOn.includes('sm'));
  if (breakpoints.md)
    temp = temp.filter((d) => !d.hideOn || !d.hideOn.includes('md'));
  if (breakpoints.lg)
    temp = temp.filter((d) => !d.hideOn || !d.hideOn.includes('lg'));
  if (breakpoints.xlg)
    temp = temp.filter((d) => !d.hideOn || !d.hideOn.includes('xlg'));
  return temp.map((t) => t.name);
};
