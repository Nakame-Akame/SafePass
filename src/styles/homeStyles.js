import {
  StyleSheet
} from 'react-native';

import colors from './colors';

const styles = StyleSheet.create({

  /* ======================================================
     CONTAINER
  ====================================================== */

  container: {
    flex: 1,
    backgroundColor:
      colors.background
  },

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20
  },

  /* ======================================================
     CARD
  ====================================================== */

  card: {
    backgroundColor:
      colors.card,

    borderRadius: 28,

    padding: 25,

    borderWidth: 1,

    borderColor:
      colors.border
  },

  /* ======================================================
     HEADER
  ====================================================== */

  header: {
    alignItems: 'center',
    marginBottom: 28
  },

  title: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 8
  },

  subtitle: {
    color: colors.subtitle,
    fontSize: 15
  },

  /* ======================================================
     INPUT
  ====================================================== */

  inputWrapper: {
    position: 'relative',
    marginBottom: 24
  },

  input: {
    backgroundColor:
      colors.background,

    borderWidth: 1,

    borderColor:
      colors.border,

    borderRadius: 18,

    paddingVertical: 16,

    paddingHorizontal: 18,

    paddingRight: 60,

    color: colors.white,

    fontSize: 16
  },

  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 16
  },

  eyeText: {
    fontSize: 22
  },

  /* ======================================================
     METER
  ====================================================== */

  meter: {
    width: '100%',
    height: 14,

    backgroundColor:
      colors.soft,

    borderRadius: 999,

    overflow: 'hidden',

    marginBottom: 20
  },

  meterFill: {
    height: '100%',
    borderRadius: 999
  },

  /* ======================================================
     ANALYSIS
  ====================================================== */

  analysisHeader: {
    marginBottom: 18
  },

  analysisText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8
  },

  entropy: {
    color: colors.text,
    fontSize: 14
  },

  /* ======================================================
     CRACK BOX
  ====================================================== */

  crackBox: {
    backgroundColor:
      colors.soft,

    borderRadius: 18,

    padding: 18,

    marginBottom: 24
  },

  crackLabel: {
    color: colors.text,
    marginBottom: 8,
    fontSize: 14
  },

  crackTime: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16
  },

  /* ======================================================
     TIPS
  ====================================================== */

  tipsBox: {
    backgroundColor:
      'rgba(239,68,68,0.08)',

    borderWidth: 1,

    borderColor:
      'rgba(239,68,68,0.18)',

    borderRadius: 18,

    padding: 18,

    marginBottom: 24
  },

  tipsTitle: {
    color: '#fca5a5',
    fontWeight: '700',
    marginBottom: 12,
    fontSize: 16
  },

  tip: {
    color: '#fecaca',
    marginBottom: 8,
    fontSize: 14
  },

  /* ======================================================
     BUTTONS
  ====================================================== */

  buttonGroup: {
    gap: 12,
    marginBottom: 28
  },

  generateButton: {
    backgroundColor:
      colors.primary,

    borderRadius: 18,

    paddingVertical: 16,

    alignItems: 'center'
  },

  copyButton: {
    backgroundColor:
      colors.soft,

    borderRadius: 18,

    paddingVertical: 16,

    alignItems: 'center'
  },

  buttonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15
  },

  /* ======================================================
     REQUIREMENTS
  ====================================================== */

  requirements: {
    gap: 12,
    marginBottom: 28
  },

  requirement: {
    backgroundColor:
      colors.soft,

    borderRadius: 14,

    padding: 14
  },

  requirementText: {
    color: '#dbeafe',
    textAlign: 'center',
    fontSize: 14
  },

  /* ======================================================
     FOOTER
  ====================================================== */

  footer: {
    borderTopWidth: 1,

    borderTopColor:
      colors.border,

    paddingTop: 20,

    alignItems: 'center'
  },

  footerText: {
    color: colors.subtitle,

    marginBottom: 8,

    textAlign: 'center',

    lineHeight: 20,

    fontSize: 13
  }
});

export default styles;