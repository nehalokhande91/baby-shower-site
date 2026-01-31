
import { Game } from './types';

export const GAMES: Game[] = [
  {
    id: 'FEUD',
    title: 'Family Feud: Desi Baby Edition',
    description: 'Guess the top 5 answers to win points! (Points: 5 for Top, 1 for 5th)',
    questions: [
      { id: 1, question: "Name a traditional gift for a Godh Bharai.", answer: ["Gold Jewelry (5)", "Saree (4)", "Cash / Lifafa (3)", "Silver Coin (2)", "Fruit Basket (1)"] },
      { id: 2, question: "Name a piece of advice an Indian Nani/Dadi always gives.", answer: ["Eat more Ghee (5)", "Apply Hing for gas (4)", "Put a Kaala Teeka (3)", "Don't go out in sun (2)", "Drink warm milk (1)"] },
      { id: 3, question: "Name a popular Indian baby girl name starting with 'A'.", answer: ["Ananya (5)", "Aavya (4)", "Anika (3)", "Aaradhya (2)", "Aditi (1)"] },
      { id: 4, question: "Name something found in an Indian nursery.", answer: ["Jhoola (Cradle) (5)", "Mosquito Net (4)", "Soft Blanket (3)", "Godri (Cotton bed) (2)", "Rattle (1)"] },
      { id: 5, question: "Name a common first solid food for babies in India.", answer: ["Dal Pani (5)", "Khichdi (4)", "Cerelac (3)", "Mashed Banana (2)", "Ragi Porridge (1)"] },
      { id: 6, question: "Name a famous Indian lullaby.", answer: ["Chanda Mama Door Ke (5)", "Lalla Lalla Lori (4)", "Lakdi Ki Kathi (3)", "Ek Mota Haathi (2)", "Nani Teri Morni (1)"] },
      { id: 7, question: "Name an oil used for baby's massage (Maalish).", answer: ["Coconut Oil (5)", "Mustard Oil (4)", "Almond Oil (3)", "Olive Oil (2)", "Sesame Oil (1)"] },
      { id: 8, question: "Name a milestone Indian parents celebrate.", answer: ["Annaprasanam (5)", "Mundan (4)", "First Word (3)", "First Steps (2)", "First Tooth (1)"] },
      { id: 9, question: "Name something a baby does that makes everyone laugh.", answer: ["Blowing Bubbles (5)", "Giggling (4)", "Making Faces (3)", "Clapping (2)", "Dancing (1)"] },
      { id: 10, question: "Name a fruit an Indian baby loves.", answer: ["Mango (5)", "Banana (4)", "Chikoo (3)", "Apple (2)", "Papaya (1)"] }
    ]
  },
  {
    id: 'TRIVIA',
    title: 'Mom or Dad Trivia',
    description: 'Elders, who fits the description best?',
    questions: [
      { id: 1, question: "Who was more 'Ziddi' (Stubborn) as a child?", answer: "Elders reveal the truth!" },
      { id: 2, question: "Who is more likely to panic at the first sneeze?", answer: "Point to the person!" },
      { id: 3, question: "Who will be the expert at singing Chanda Mama?", answer: "Sing it for us!" },
      { id: 4, question: "Who will take the most photos of the baby sleeping?", answer: "The paparazzi parent!" },
      { id: 5, question: "Who will call the grandparents for advice first?", answer: "Dialing now!" },
      { id: 6, question: "Who is more likely to fall asleep while rocking the baby?", answer: "Sweet dreams!" },
      { id: 7, question: "Who suggested the most baby names?", answer: "List them out!" },
      { id: 8, question: "Who was a bigger foodie as a kid?", answer: "Grandparents, please share!" },
      { id: 9, question: "Who is more nervous about diaper duty?", answer: "Dirty business!" },
      { id: 10, question: "Who will be the 'Cool' parent?", answer: "Everyone knows!" }
    ]
  },
  {
    id: 'FACTS',
    title: 'Baby Facts Guessing',
    description: 'Science facts about babies for our wise family.',
    questions: [
      { id: 1, question: "How many bones are babies born with?", answer: "300 (They fuse to 206 later)" },
      { id: 2, question: "What is the first color a baby sees?", answer: "Red" },
      { id: 3, question: "True or False: Babies are born without kneecaps.", answer: "True (It's just cartilage)" },
      { id: 4, question: "Which sense develops first in the womb?", answer: "Hearing" },
      { id: 5, question: "How many taste buds does a baby have?", answer: "About 30,000 (3x an adult!)" },
      { id: 6, question: "True or False: Babies have a swimming reflex.", answer: "True" },
      { id: 7, question: "How many diapers does a baby use in Year 1?", answer: "About 2,500 to 3,000" },
      { id: 8, question: "When do babies start seeing clearly?", answer: "Around 6-10 months" },
      { id: 9, question: "How big is a newborn's stomach on Day 1?", answer: "The size of a cherry" },
      { id: 10, question: "True or False: Newborns don't produce tears.", answer: "True (Ducts aren't ready yet)" }
    ]
  }
];
