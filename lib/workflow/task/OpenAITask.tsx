import { TaskParamType, TaskType } from "@/types/task";
import { BrainCircuitIcon, LucideProps } from "lucide-react";
import React from "react";

export const OpenAITask = {
  type: TaskType.OPENAI_CALL,
  label: "OpenAI Call",
  icon: (props: LucideProps): React.ReactElement => (
    <BrainCircuitIcon className="stroke-blue-400" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "API Key",
      type: TaskParamType.STRING,
      helperText: "Your OpenAI API key (sk-...)",
      required: true,
      hideHandle: true,
      sensitive: true, // Mark as sensitive to hide value in UI
    },
    {
      name: "Model",
      type: TaskParamType.SELECT,
      helperText: "Choose the OpenAI model to use",
      required: true,
      hideHandle: true,
      options: [
        { label: "GPT-4", value: "gpt-4" },
        { label: "GPT-4 Turbo", value: "gpt-4-turbo" },
        { label: "GPT-3.5 Turbo", value: "gpt-3.5-turbo" },
        { label: "GPT-4o", value: "gpt-4o" },
        { label: "GPT-4o Mini", value: "gpt-4o-mini" },
      ],
      defaultValue: "gpt-4o",
    },
    {
      name: "System Prompt",
      type: TaskParamType.TEXTAREA,
      helperText: "System message to set the AI's behavior and context",
      required: false,
      hideHandle: true,
      defaultValue: "You are a helpful assistant.",
    },
    {
      name: "User Message",
      type: TaskParamType.TEXTAREA,
      helperText: "The message/prompt to send to the AI",
      required: true,
      hideHandle: false, // Allow connection from other nodes
    },
    {
      name: "Max Tokens",
      type: TaskParamType.NUMBER,
      helperText: "Maximum number of tokens to generate (optional)",
      required: false,
      hideHandle: true,
      defaultValue: 1000,
      min: 1,
      max: 4000,
    },
    {
      name: "Temperature",
      type: TaskParamType.NUMBER,
      helperText: "Controls randomness (0.0 to 2.0). Higher = more creative",
      required: false,
      hideHandle: true,
      defaultValue: 0.7,
      min: 0,
      max: 2,
      step: 0.1,
    },
  ],
  outputs: [
    {
      name: "Response",
      type: TaskParamType.STRING,
      helperText: "The AI's response text",
    },
    {
      name: "Usage",
      type: TaskParamType.OBJECT,
      helperText: "Token usage information",
    },
    {
      name: "Model Used",
      type: TaskParamType.STRING,
      helperText: "The model that was used for the call",
    },
  ],
};