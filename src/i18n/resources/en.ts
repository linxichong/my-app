export default {
  label: {
    name: "Name",
    email: "Email",
    namePlaceHolder: "Enter your Name",
    emailPlaceHolder: "Enter your email",
    reset: "reset",
    submit: "submit"
  },
  validate: {
    required: "{{name}} field cannot be empty.",
    range:
      "Please enter as many characters as {{max}} and {{min}} in {{name}}.",
    min: "Please enter as many characters as {{min}} in {{name}}.",
    email: "Please enter a valid email address for {{name}}."
  }
};
