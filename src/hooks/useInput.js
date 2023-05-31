import { useState, useCallback } from "react";

export default (initalValue = "") => {
  // state 정의
  const [data, setData] = useState(initalValue);

  // 함수 정의
  const handler = useCallback(
    e => {
      const { value, name } = e.target;
      setData({
        ...data,
        [name]: value
      });
    },
    [data]
  );
  return [data, handler];
};
