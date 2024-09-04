1) We need email service .
2) We use nodemailer. What it will be doing is that it will connect to their smtp servers and send email.
3) We have created one time password from myaccount.google.com/apppasswords?
4) Now we need to setup transporter object. this helps us to send email.
5) We have to made email-config and write there.
6) The send email is promise base syntax. We can put try catch and async await
7) We are installing node-cron for schedulling reminder. That we have to send reminder on this date
8) We are planning to check database after every certain amount of time ki humko un data mein se kis kisko reminder bhejna hai 
9) we are expected to send data at 10.00AM
Every 5 minutes 
We will check are there any emails that are expected to be sent by now and is pending. This is what we are doing in utils.js
10) jab bhi humko koi operation karna hai to Op isko bhoolna nhi . 
11) Abhi hum khud notification bhej rhe hai ki itne bje email bhejna hai uss hissab se har 5 min mein scheduler check karega aur agar current time se kam hua kisi ka notification time to send kar denge.
12) To RABBITMQ is used in message queuing . Suppose your reminder service goes down then it will not be able to recieve message from booking. In order to prevent this we concept of message queues .We use a package amqplib to implement RABBITMQ. It is installed both in reminder and booking. First install RabbitMQ it is one time installation so you dont need to install again and amqplib is a package.
13) Now we our task is to publish the message . But publishing will be done by booking service and there also channel ,key will be required so we will make same message queue there also.
14) jabhi booking wala karoge rabbit mq server start hona chahiye. by default it runs on localhost:15672 and username and password is guest.
15) 