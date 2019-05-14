export function getColor(appGradient: string) {
    const ascii_code = (appGradient.toLowerCase().charCodeAt(0) +
      appGradient.toLowerCase().charCodeAt(appGradient.length - 1)) / 2;
    if (ascii_code >= 97 && ascii_code <= 102) {
      return 'linear-gradient(135deg, #FAD961 30%, #F76B1C 100%)';
    } else if (ascii_code > 102 && ascii_code <= 107) {
      return 'linear-gradient(135deg, #822DAF 30%, #D80F5B 100%)';
    } else if (ascii_code > 107 && ascii_code <= 112) {
      return 'linear-gradient(135deg, #67C0F5 30%, #328AFE 100%)';
    } else if (ascii_code > 112 && ascii_code <= 117) {
      return 'linear-gradient(135deg, #B05FDC 30%, #FF82E0 100%)';
    } else {
      return 'linear-gradient(135deg, #B4EC51 30%, #429321 100%)';
    }
  }
