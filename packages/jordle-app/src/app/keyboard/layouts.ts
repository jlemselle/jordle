export enum KeyboardLayout {
  Qwerty,
  Azerty,
}

const qwerty = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

const azerty = [
  ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
  ['w', 'x', 'c', 'v', 'b', 'n'],
];

export function getKeys(layout: KeyboardLayout): string[][] {
  if (layout === KeyboardLayout.Qwerty) {
    return qwerty;
  } else {
    return azerty;
  }
}

export function getEnterText(layout: KeyboardLayout): string {
  if (layout === KeyboardLayout.Qwerty) {
    return 'enter';
  } else {
    return 'entrer';
  }
}

export function getBackspaceText(layout: KeyboardLayout): string {
  if (layout === KeyboardLayout.Qwerty) {
    return 'backspace';
  } else {
    return 'suppr arrière';
  }
}
