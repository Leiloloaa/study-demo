import { ref } from "vue";

interface User {
  userName: string;
  password: string;
  repeat_password?: string;
}

export const userForm = ref<User>({
  userName: "",
  password: "",
  repeat_password: "",
});

interface Rule {
  userName: {
    message: string;
    required: boolean;
    trigger: string;
  }[];
  password: ({
    required: boolean;
    message: string;
    trigger: string;
    min?: undefined;
    max?: undefined;
  } | {
    min: number;
    max: number;
    message: string;
    trigger: string;
    required?: undefined;
  })[];
  repeat_password: ({
    required: boolean;
    message: string;
    trigger: string;
    min?: undefined;
    max?: undefined;
  } | {
    min: number;
    max: number;
    message: string;
    trigger: string;
    required?: undefined;
  })[];
}

export const rules = ref<Rule>({
  userName: [
    {
      message: "userName is incorrect...",
      required: true,
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Password could not be empty...",
      trigger: "blur",
    },
    {
      min: 6,
      max: 30,
      message: "Password's length has to be 6 to 30 characters...",
      trigger: "blur",
    },
  ],
  repeat_password: [
    {
      required: true,
      message: "Password could not be empty...",
      trigger: "blur",
    },
    {
      min: 6,
      max: 30,
      message: "Password could not be empty...",
      trigger: "blur",
    },
  ],
});