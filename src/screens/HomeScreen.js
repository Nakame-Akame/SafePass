import React, {
  useState,
  useMemo,
  useEffect
} from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import styles from '../styles/homeStyles';

/* ======================================================
   COMPONENTS
====================================================== */

import PasswordInput
from '../components/PasswordInput';

import StrengthMeter
from '../components/StrengthMeter';

import CrackBox
from '../components/CrackBox';

import TipsBox
from '../components/TipsBox';

import RequirementCard
from '../components/RequirementCard';

/* ======================================================
   UTILS
====================================================== */

import {
  evaluatePassword
} from '../utils/passwordEvaluator';

import {
  generateSecurePassword
} from '../utils/passwordGenerator';

/* ======================================================
   HOME SCREEN
====================================================== */

export default function HomeScreen() {

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  /* ======================================================
     LIVE ANALYSIS
  ====================================================== */

  const analysis = useMemo(
    () => evaluatePassword(password),
    [password]
  );

  /* ======================================================
     RESET COPY STATUS
  ====================================================== */

  useEffect(() => {

    if (!copied) return;

    const timer = setTimeout(() => {

      setCopied(false);

    }, 1800);

    return () =>
      clearTimeout(timer);

  }, [copied]);

  /* ======================================================
     GENERATE PASSWORD
  ====================================================== */

  const handleGenerate = async () => {

    try {

      setLoading(true);

      await new Promise(resolve =>
        setTimeout(resolve, 400)
      );

      const generated =
        generateSecurePassword(18);

      setPassword(generated);

      setShowPassword(true);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  /* ======================================================
     COPY PASSWORD
  ====================================================== */

  const handleCopy = () => {

    setCopied(true);
  };

  /* ======================================================
     UI
  ====================================================== */

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView
        contentContainerStyle={
          styles.scroll
        }
        showsVerticalScrollIndicator={
          false
        }
      >

        <View style={styles.card}>

          {/* ======================================================
              HEADER
          ====================================================== */}

          <View style={styles.header}>

            <Text style={styles.title}>
              SafePass 🛡️
            </Text>

            <Text style={styles.subtitle}>
              Advanced Password Analyzer
            </Text>

          </View>

          {/* ======================================================
              PASSWORD INPUT
          ====================================================== */}

          <PasswordInput
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={
              setShowPassword
            }
          />

          {/* ======================================================
              STRENGTH METER
          ====================================================== */}

          <StrengthMeter
            progress={analysis.progress}
            color={analysis.color}
          />

          {/* ======================================================
              STATUS
          ====================================================== */}

          <View
            style={
              styles.analysisHeader
            }
          >

            <Text
              style={{
                ...styles.analysisText,
                color:
                  analysis.color
              }}
            >

              {analysis.label}

            </Text>

            <Text style={styles.entropy}>

              Entropía:
              {' '}
              {analysis.entropy}
              {' '}
              bits

            </Text>

          </View>

          {/* ======================================================
              CRACK TIME
          ====================================================== */}

          <CrackBox
            crackTime={
              analysis.crackTime
            }
          />

          {/* ======================================================
              SECURITY TIPS
          ====================================================== */}

          <TipsBox
            tips={analysis.tips}
          />

          {/* ======================================================
              BUTTONS
          ====================================================== */}

          <View
            style={
              styles.buttonGroup
            }
          >

            <TouchableOpacity
              style={
                styles.generateButton
              }
              onPress={
                handleGenerate
              }
              activeOpacity={0.8}
            >

              {
                loading ? (

                  <ActivityIndicator
                    color="#fff"
                  />

                ) : (

                  <Text
                    style={
                      styles.buttonText
                    }
                  >

                    Generar contraseña

                  </Text>
                )
              }

            </TouchableOpacity>

            <TouchableOpacity
              style={
                styles.copyButton
              }
              onPress={handleCopy}
              activeOpacity={0.8}
            >

              <Text
                style={
                  styles.buttonText
                }
              >

                {
                  copied
                    ? 'Copiado ✅'
                    : 'Copiar'
                }

              </Text>

            </TouchableOpacity>

          </View>

          {/* ======================================================
              REQUIREMENTS
          ====================================================== */}

          <View
            style={
              styles.requirements
            }
          >

            <RequirementCard
              text="✔ 12+ caracteres"
            />

            <RequirementCard
              text="✔ Símbolos especiales"
            />

            <RequirementCard
              text="✔ Mezcla de letras"
            />

            <RequirementCard
              text="✔ Sin patrones comunes"
            />

          </View>

          {/* ======================================================
              FOOTER
          ====================================================== */}

          <View style={styles.footer}>

            <Text
              style={
                styles.footerText
              }
            >

              🔒 Privacidad garantizada

            </Text>

            <Text
              style={
                styles.footerText
              }
            >

              Todo el análisis ocurre localmente.

            </Text>

            <Text
              style={
                styles.footerText
              }
            >

              Funciona incluso sin conexión.

            </Text>

          </View>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}