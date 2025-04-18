import { useCallback, useMemo, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../helpers/regex.helper";
import useAuth from "../hooks/useAuth";
import { TUser } from "../types/TUser";

const RegisterScreen = () => {
  const { handleRegister } = useAuth();
  const [formData, setFormData] = useState<TUser>({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState<TUser>({
    email: "",
    password: "",
    name: "",
  });

  const validateForm = useCallback(() => {
    const errors: TUser = {
      email: "",
      password: "",
      name: "",
    };

    if (!REGEX_EMAIL.test(formData.email ?? "")) {
      errors.email = "Email must be a valid email address";
    } else {
      errors.email = "";
    }

    if (!REGEX_PASSWORD.test(formData.password ?? "")) {
      errors.password =
        "Password must be at least 8 characters long and contain at least one big letter, one small letter, at least one number and one special character";
    } else {
      errors.password = "";
    }

    if (!formData.name) {
      errors.name = "Name is required";
    }

    setErrors(errors);
    return errors.email === "" && errors.password === "" && errors.name === "";
  }, [formData]);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateForm();
  };

  const isValid = useMemo(() => validateForm(), [validateForm]);

  <View style={styles.formControl}>
    <TextInput
      style={errors.name ? [styles.input, styles.errorInput] : styles.input}
      placeholder="Name"
      onChange={(e) => handleInputChange("name", e.nativeEvent.text)}
    />
    <Text style={styles.errorText}>{errors.name}</Text>
  </View>;

  return (
    <View style={styles.container}>
      <View style={styles.formControl}>
        <TextInput
          style={errors.name ? [styles.input, styles.errorInput] : styles.input}
          placeholder="Name"
          onChange={(e) => handleInputChange("name", e.nativeEvent.text)}
        />
        <Text style={styles.errorText}>{errors.name}</Text>
      </View>

      <View style={styles.formControl}>
        <TextInput
          style={errors.email ? [styles.input, styles.errorInput] : styles.input}
          placeholder="Email"
          onChange={(e) => handleInputChange("email", e.nativeEvent.text)}
          keyboardType="email-address"
        />
        <Text style={styles.errorText}>{errors.email}</Text>
      </View>

      <View style={styles.formControl}>
        <TextInput
          style={errors.password ? [styles.input, styles.errorInput] : styles.input}
          placeholder="Password"
          secureTextEntry
          onChange={(e) => handleInputChange("password", e.nativeEvent.text)}
        />
        <Text style={styles.errorText}>{errors.password}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          disabled={!isValid}
          title="Send"
          onPress={async () => await handleRegister(formData)}
        />

        <Button
          title="Reset"
          onPress={() => {
            setFormData({
              email: "",
              password: "",
              name: "",
            });
            setErrors({
              email: "",
              password: "",
              name: "",
            });
          }}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    paddingTop: "25%",
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 2,
    borderBottomWidth: 3,
    borderColor: "#007BFF",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  formControl: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
    justifyContent: "flex-start",
    gap: 4,
  },
});
