import imaplib
import email
import time

#logs in to the desired account and navigates to the inbox
mail = imaplib.IMAP4_SSL('imap.gmail.com')
mail.login('diksha.impl@gmail.com','Demo1234')


while(True):
  print("a")
  mail.list()
  mail.select('inbox')
  subject = "500 error"
  result, data = mail.search(None,'(UNSEEN SUBJECT "%s")' % subject)
  for num in data[0].split():
    ids = data[0]
    typ, mail_data = mail.fetch(num,'(RFC822)')
    print(mail_data[0])
    typ, seen_data = mail.store(num,'+FLAGS','\\Seen')
    print(typ)
  time.sleep(3)