import { useCallback, useMemo, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../helpers/regex.helper";
import useAuth from "../hooks/useAuth";
import { TUser } from "../types/TUser";

const LoginScreen = () => {
  const { handleLogin } = useAuth();
  const [formData, setFormData] = useState<Partial<TUser>>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<TUser>>({ email: "", password: "" });

  const validateForm = useCallback(() => {
    const errors: Partial<TUser> = {
      email: "",
      password: "",
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

    setErrors(errors);
    return errors.email === "" && errors.password === "";
  }, [formData]);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateForm();
  };

  const isValid = useMemo(() => validateForm(), [validateForm]);

  return (
    <View style={styles.container}>
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

      <Button
        disabled={!isValid}
        title="Login"
        onPress={async () => await handleLogin(formData)}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
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
