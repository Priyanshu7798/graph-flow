import { TaskType } from "@/types/task";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { OpenAITask } from "./OpenAITask";
import { PageToHtmlTask } from "./PageToHtml";


export const TaskRegistry = {
  [TaskType.LAUNCH_BROWSER]: LaunchBrowserTask,
  [TaskType.OPENAI_CALL]: OpenAITask,
  [TaskType.PAGE_TO_HTML]: PageToHtmlTask,

}