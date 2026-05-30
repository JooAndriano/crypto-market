import React, { useContext, useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  loginByEmail,
  loginByPhone,
} from "../services/authService";

import {
  saveToken,
} from "../utils/storage";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";

import { RootStackParamList } from "../types/navigation";
import { Colors } from "../theme/colors";
import { AuthContext } from "../context/authContext";
import CountryCode from "../components/CountryCode";
import { Country } from "../types/country";
import {
  getCountries,
} from "../services/countryService";
import CountryPickerModal from "../components/CountryPickerModal";
import { countryFlags }
from "../utils/countryFlags";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

export default function LoginScreen({
  navigation,
}: Props) {
    useEffect(() => {
      loadCountries();
    }, []);

    async function loadCountries() {
      try {
        const data =
          await getCountries();

           console.log(
             JSON.stringify(data, null, 2)
           );

        setCountries(data);

        if (data.length > 0) {
          setSelectedCountry(
            data[0]
          );
        }
      } catch (e) {
        console.log(e);
      }
    }

  const [isEmail, setIsEmail] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [errors,
    setErrors] =
    useState<
      Record<
        string,
        string
      >
    >({});

  const {
    dispatch,
  } = useContext(
    AuthContext
  );

  const [countries,
    setCountries] =
    useState<Country[]>(
      []
    );

  const [showCountries,
    setShowCountries] =
    useState(false);

const [selectedCountry,
  setSelectedCountry] =
  useState<Country>({
    name: "Indonesia",
    code: "ID",
    dial_code: "+62",
  });

const countryCode =
  selectedCountry.dial_code.replace(
    /\+/g,
    ""
  );

const fullPhone =
  `${countryCode}${phone}`;

 async function handleLogin() {
   try {
     let response;

     if (isEmail) {
       response =
         await loginByEmail(
           email,
           password
         );
     } else {
       response =
         await loginByPhone(
           fullPhone,
           password
         );
     }

     await saveToken(
       response.data.token
     );

     dispatch({
       type: "LOGIN_SUCCESS",
       payload: {
         token: response.data.token,
         otp: response.data.otp,
         phone: isEmail
           ? ""
           : fullPhone,
         email,
         loginMethod: isEmail
           ? "email"
           : "phone",
       },
     });
     console.log("SAVED STATE");

     console.log({
       phone: isEmail
         ? ""
         : fullPhone,
       email,
       otp: response.data.otp,
     });

     console.log(
       JSON.stringify(
         response.data,
         null,
         2
       )
     );
     console.log({
       phone: fullPhone,
       otp:
         response.data.otp,
       token:
         response.data.token,
     });
     if (isEmail) {
       navigation.replace(
         "Market"
       );
     } else {
       navigation.navigate(
         "OTP"
       );
     }
   } catch (error) {
     console.log(error);
   }
 }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Sign In
        </Text>

        <View style={styles.row}>
          <Text style={styles.label}>
            {isEmail
              ? "Email"
              : "Mobile Number"}
          </Text>

          <TouchableOpacity
            onPress={() =>
              setIsEmail(!isEmail)
            }
          >
            <Text style={styles.switchText}>
              {isEmail
                ? "Sign in with Phone Number"
                : "Sign in with Email"}
            </Text>
          </TouchableOpacity>
        </View>

        {isEmail ? (
          <AppInput
            value={email}
            placeholder="username@gmail.com"
            onChangeText={setEmail}
            keyboardType="email-address"
            error={errors.email}
          />
        ) : (
            <AppInput
              value={phone}
              placeholder="Enter your phone number"
              onChangeText={setPhone}
              keyboardType="number-pad"
              leftComponent={
                <CountryCode
                  flag={
                    countryFlags[
                      selectedCountry.code
                    ]
                  }
                  dialCode={
                    selectedCountry.dial_code
                  }
                  onPress={() =>
                    setShowCountries(
                      true
                    )
                  }
                />
              }
            />
        )}

        <View style={styles.passwordSection}>
          <View style={styles.row}>
            <Text style={styles.label}>
              Password
            </Text>

            <TouchableOpacity
              onPress={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              <Text
                style={styles.switchText}
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </Text>
            </TouchableOpacity>
          </View>

          <AppInput
            value={password}
            placeholder="Enter your password"
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            error={errors.password}
          />
        </View>

        <Text style={styles.forgot}>
          Forgot Password?
        </Text>

        <View style={styles.buttonContainer}>
          <AppButton
            title="Sign In"
            onPress={handleLogin}
          />
        </View>
      </View>
      <CountryPickerModal
        visible={
          showCountries
        }
        countries={
          countries
        }
        onClose={() =>
          setShowCountries(
            false
          )
        }
        onSelect={country => {
          setSelectedCountry(country);
          setPhone("");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 32,
  },

  row: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  label: {
    fontSize: 13,
    color: Colors.text,
  },

  switchText: {
    fontSize: 12,
    color: Colors.primary,
  },

  passwordSection: {
    marginTop: 16,
  },

  forgot: {
    marginTop: 8,
    fontSize: 12,
    color: Colors.primary,
  },

  buttonContainer: {
    marginTop: 32,
  },
});