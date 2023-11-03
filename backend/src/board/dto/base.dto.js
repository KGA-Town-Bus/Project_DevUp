class BaseDTO {
  validate(props) {
    if (!props) throw new Error("body 내용 비어있음");
    if (typeof props !== "object") throw new Error("body 타입이 다름");

    for (const key in props) {
      if (
        props[key] === null ||
        props[key] === undefined ||
        props[key] === ""
      ) {
        throw new Error(`${key} 속성이 비어있음`);
      }
    }
  }

  toDate(d) {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }
}

module.exports = BaseDTO;
