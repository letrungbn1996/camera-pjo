import { StringAnyObj } from '../../types/Object'
import { format as fnsFormat } from "date-fns";

const templates:StringAnyObj = {
  date: "yyyy/MM/dd",
  jaDate: "yyyy年MM月dd日",
  hm: "HH:mm",
};

const format = (targetDay:any, template:string) => {
  if (!targetDay) return
  if (!(targetDay instanceof Date)) targetDay = new Date(targetDay)
  if (template == null) return fnsFormat(targetDay, templates.date)
  if (template in templates) return fnsFormat(targetDay, templates[template])

  return fnsFormat(targetDay, template)
};

export default format