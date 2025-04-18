import { useCallback, useMemo, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../helpers/regex.helper";
import useAuth from "../hooks/useAuth";
import { TUser } from "../types/TUser";

const RegisterScreen = () => {
  const { handleLogin } = useAuth();
  const [formData, setFormData] = useState<Partial<TUser & Record<string, any>>>({
    email: "",
    password: "",
    name: {
      first: "",
      middle: "",
      last: "",
    },
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zip: "",
    },
  });
  const [errors, setErrors] = useState<Partial<TUser>>({
    email: "",
    password: "",
    name: {
      first: "",
      middle: "",
      last: "",
    },
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zip: "",
    },
  });

  const validateForm = useCallback(() => {
    const errors: Partial<TUser> = {
      email: "",
      password: "",
      name: {
        first: "",
        middle: "",
        last: "",
      },
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        zip: "",
      },
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

    if (!formData.name?.first) {
      errors.name = errors.name || { first: "", middle: "", last: "" };
      errors.name.first = "First name is required";
    }
    if (!formData.name?.last) {
      errors.name = errors.name || { first: "", middle: "", last: "" };
      errors.name.last = "Last name is required";
    }

    if (!formData.address?.street) {
      errors.address = errors.address || {
        street: "",
        city: "",
        state: "",
        country: "",
        zip: "",
      };
      errors.address.street = "Street address is required";
    }

    if (!formData.address?.city) {
      errors.address = errors.address || {
        street: "",
        city: "",
        state: "",
        country: "",
        zip: "",
      };
      errors.address.city = "City is required";
    }

    if (!formData.address?.state) {
      errors.address = errors.address || {
        street: "",
        city: "",
        state: "",
        country: "",
        zip: "",
      };
      errors.address.state = "State is required";
    }
    if (!formData.address?.country) {
      errors.address = errors.address || {
        street: "",
        city: "",
        state: "",
        country: "",
        zip: "",
      };
      errors.address.country = "Country is required";
    }

    setErrors(errors);
    return (
      errors.email === "" &&
      errors.password === "" &&
      errors.name?.first === "" &&
      errors.name?.last === "" &&
      errors.address?.street === "" &&
      errors.address?.city === "" &&
      errors.address?.state === "" &&
      errors.address?.country === ""
    );
  }, [formData]);

  const handleInputChange = (name: string, value: string) => {
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...(prev[parent] as Record<string, any>), [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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

      <View style={styles.formControl}>
        <TextInput
          style={errors.name?.first ? [styles.input, styles.errorInput] : styles.input}
          placeholder="First Name"
          onChange={(e) => handleInputChange("name.first", e.nativeEvent.text)}
        />
        <Text style={styles.errorText}>{errors.name?.first}</Text>
      </View>

      <View style={styles.formControl}>
        <TextInput
          style={errors.name?.last ? [styles.input, styles.errorInput] : styles.input}
          placeholder="Last Name"
          onChange={(e) => handleInputChange("name.last", e.nativeEvent.text)}
        />
        <Text style={styles.errorText}>{errors.name?.last}</Text>
      </View>

      <View style={styles.formControl}>
        <TextInput
          style={errors.name?.middle ? [styles.input, styles.errorInput] : styles.input}
          placeholder="Middle Name"
          onChange={(e) => handleInputChange("middle.first", e.nativeEvent.text)}
        />
        <Text style={styles.errorText}>{errors.name?.middle}</Text>
      </View>

      <View style={styles.formControl}>
        <TextInput
          style={errors.phone ? [styles.input, styles.errorInput] : styles.input}
          placeholder="Phone Number"
          onChange={(e) => handleInputChange("phone", e.nativeEvent.text)}
        />
        <Text style={styles.errorText}>{errors.phone}</Text>
      </View>

      <View style={styles.formControl}>
        <TextInput
          style={
            errors.address?.street ? [styles.input, styles.errorInput] : styles.input
          }
          placeholder="Street Address"
          onChange={(e) => handleInputChange("address.street", e.nativeEvent.text)}
        />
        <Text style={styles.errorText}>{errors.address?.street}</Text>
      </View>

      <View style={styles.formControl}>
        <TextInput
          style={errors.address?.city ? [styles.input, styles.errorInput] : styles.input}
          placeholder="City"
          onChange={(e) => handleInputChange("address.city", e.nativeEvent.text)}
        />
        <Text style={styles.errorText}>{errors.address?.city}</Text>
      </View>

      <View style={styles.formControl}>
        <TextInput
          style={errors.address?.state ? [styles.input, styles.errorInput] : styles.input}
          placeholder="State"
          onChange={(e) => handleInputChange("address.state", e.nativeEvent.text)}
        />
        <Text style={styles.errorText}>{errors.address?.state}</Text>
      </View>

      <View style={styles.formControl}>
        <TextInput
          style={
            errors.address?.country ? [styles.input, styles.errorInput] : styles.input
          }
          placeholder="Country"
          onChange={(e) => handleInputChange("address.country", e.nativeEvent.text)}
        />
        <Text style={styles.errorText}>{errors.address?.country}</Text>
      </View>

      <View style={styles.formControl}>
        <TextInput
          style={errors.address?.zip ? [styles.input, styles.errorInput] : styles.input}
          placeholder="Zip Code"
          onChange={(e) => handleInputChange("address.zip", e.nativeEvent.text)}
        />
        <Text style={styles.errorText}>{errors.address?.zip}</Text>
      </View>

      <Button
        disabled={!isValid}
        title="Send"
        onPress={async () => await handleLogin(formData)}
      />

      <Button
        title="Reset"
        onPress={() => {
          setFormData({
            email: "",
            password: "",
            name: {
              first: "",
              middle: "",
              last: "",
            },
            phone: "",
            address: {
              street: "",
              city: "",
              state: "",
              country: "",
              zip: "",
            },
          });
          setErrors({
            email: "",
            password: "",
            name: {
              first: "",
              middle: "",
              last: "",
            },
            phone: "",
            address: {
              street: "",
              city: "",
              state: "",
              country: "",
              zip: "",
            },
          });
        }}
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    paddingTop: "5%",
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
