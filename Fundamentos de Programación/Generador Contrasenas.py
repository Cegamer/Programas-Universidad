import string as st
import random as rnd
letras = st.digits + st.ascii_letters + st.punctuation
longitud_Pass = 32
password = ""
for i in range(longitud_Pass):
  password += letras[rnd.randint(0,len(letras)-1)]
print(password)