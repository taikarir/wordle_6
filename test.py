import pickle

with open("./6_letter_words.txt","rb") as f:
    lines = f.readlines()
    print(len(lines))
    words = lines[0].split()
    print(len(words))
with open("./6_letter_words.pkl","wb") as f:
    pickle.dump(words,f)
