export const AFFIRMATIONS = [
  "What you turned away from, you have begun to master.",
  "Stillness is its own kind of strength.",
  "Each minute given is a minute reclaimed.",
  "You chose presence. Presence chose you back.",
  "The quiet you held will echo through the day.",
  "Discipline, gently practiced, becomes freedom.",
  "You did not need what you set down.",
  "Attention is the rarest gift. You gave it to yourself.",
  "Small offerings, made often, build a steady soul.",
  "You met the moment without flinching.",
  "What you did not do, matters as much as what you did.",
  "The flame you tended was your own.",
  "You returned to yourself, and found someone waiting.",
  "Focus is a vow renewed, not a battle won.",
  "The world will keep. You were here.",
];

export function pickAffirmation(): string {
  return AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
}
