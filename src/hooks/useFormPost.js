import { message } from 'antd';
import useTime from './useTime';
import { endPoints } from '../endpoints';
import { baseUrl } from '../baseUrl';

const useFormPost = (setOpen, open, formRequest, fetchData) => {
    const { time } = useTime();

    const clockOut = (record) => {
      fetch(baseUrl + `${endPoints.getAllStudentClockedIn}/${record.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: record.fullName,
          code: record.code,
          lga: record.lga,
          timeIn: record.timeIn,
          timeOut: time,
          isClockedIn: false
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then(() => {
          message.success("Clocked out successfully");
          window.location.reload();
          fetchData()
        })
        .catch(() => {
          message.success("Clocked out unsuccessful");
        });
    };

      const onFinish = () => {
        setOpen(!open);
        fetch(baseUrl + endPoints.getAllStudentClockedIn, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formRequest,
            timeIn: time,
            id: Date.now(),
            isClockedIn: true,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then(() => {
            message.success("Clocked in successfully");
            window.location.reload()
           fetchData();
          })
          .catch((err) => {
            message.error("Clocked in unsuccessful", err);
          });
      };

    return {
      clockOut,
      onFinish
    }
}

export default useFormPost