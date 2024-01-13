import dayjs from 'dayjs'

export const formatDefaultTime = (times: any) => {
      if (times.start && times.end) {
            return [
                  dayjs(
                        dayjs(Date.now()).format("YYYY-MM-DD") + times.start
                  ),
                  dayjs(
                        dayjs(Date.now()).format("YYYY-MM-DD") + times.end
                  ),
            ];
      } else {
            return [
                  dayjs(
                        dayjs(Date.now()).format("YYYY-MM-DD")
                  ),
                  dayjs(
                        dayjs(Date.now()).format("YYYY-MM-DD")
                  ),
            ];
      }
};
