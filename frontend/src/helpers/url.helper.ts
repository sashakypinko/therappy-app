export const replaceParamsInReactUrl = (url: string, params: any) => {
  const splittedUrl = url.split('/').map((el) => {
    if (el[0] === ':') {
      const attribute = el.substring(1);
      return params[attribute] ?? el;
    }
    return el;
  });

  return splittedUrl.join('/');
};
