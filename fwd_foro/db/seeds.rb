# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


# User.create(name: "Joshua", description: "Soy un estudiante de FWD soy Joshwanlover", email: "jgatjensc@fwdcostarica.com", encrypted_password: "jnwsuh9272e82382ed")
# User.create(name: "Wilberth", description: "Soy un estudiante de FWD", email: "wmataa@fwdcostarica.com", encrypted_password: "s87hqwiismwpoow")

# Question.create(title: "Necesito ayuda para poner una imagen como un background", body: "Se me olvidó como poner una imagen como background y no encuentro información para poder ponerlo", question_points: 4)
# Question.create(title: "¿qué es rails?", body: "Nos dijeron que veríamos eso en backend y quiero saber qué es", question_points: 9)

# db/seeds.rb



# User.create(
#   name: 'Usuario 1',
#   description: 'Descripción del Usuario 1',
#   email: 'usuario1@example.com',
#   password: 'tu_contraseña_aqui',
#   encrypted_password: '$2a$12$Nq1p9xxfoOhpD9ULwCHFOOBVrIKfAqpFozawcxhNy/OVGIyD/wkA2',
#   avatar_id: 0
# )
# User.create(
#   name: 'Usuario 2',
#   description: 'Descripción del Usuario 2',
#   email: 'usuario2@example.com',
#   password: 'tu_contraseña_aqui2',
#   encrypted_password: '$2a$12$Nq1p9xxfoOhpD9ULwCHFOOBVrIKfAqpFozawcxhNy/OVGIyD/wkA2',
#   avatar_id: 1
# )

#  Question.create(user_id: 1, title: "Necesito ayuda para poner una imagen como un background", body: "Se me olvidó como poner una imagen como background y no encuentro información para poder ponerlo", question_points: 4)
#  Question.create(user_id: 2 ,title: "¿qué es rails?", body: "Nos dijeron que veríamos eso en backend y quiero saber qué es", question_points: 9)



# puts 'Se creo el ejemplo'




# Label.create( name: "Javascript", description: "JavaScript es un lenguaje de programación que los desarrolladores utilizan para hacer páginas web interactivas")
# Label.create( name: "CSS", description: "CSS es una función que se agrega a HTML que proporciona tanto a los desarrolladores de sitios Web, así como a los usuarios, más control sobre cómo se muestran las páginas")

# Answer.create(user_id: 1, question_id: 1, body: "Debes de utilizar 'Background_image", answer_points: 2)
# Answer.create(user_id: 2, question_id: 2, body: "Ruby on Rails, también conocido como RoR o Rails, es un framework de aplicaciones web de código abierto escrito en el lenguaje de programación Ruby, siguiendo el paradigma del patrón Modelo Vista Controlador (MVC)", answer_points: 7)

# Comment.create(user_id: 1, question_id: 1, answer_id: 2, body: "Muchas gracias por la ayuda :)")
# Comment.create(user_id: 2, question_id: 2, answer_id: 2, body: "Muchas gracias, investigaré un poco para estar más informado")

# Achievement.create( name: "Number 1", description: "Alcanza la primer posición en el ranking", requirements: "Debes alcanzar la primer posición en el ranking de tu liga")
# Achievement.create( name: "Principiante", description: "crea tu primera pregunta", requirements: "Crea tu primera pregunta y súbela")



User.create(
  name: 'Joshua',
  description: 'JoshWan es real',
  email: 'JhosWanLover33@gmail.com',
  password: '12345678',
  # encrypted_password: '$2a$12$Nq1p9xxfoOhpD9ULwCHFOOBVrIKfAqpFozawcxhNy/OVGIyD/wkA2',
  # avatar_id: nil
  # jti: nil
)

User.create(
  name: 'Wilberth',
  description: 'Adoro react',
  email: 'React_hater12@gmail.com',
  password: '12345678',
  # encrypted_password: '$2a$12$Nq1p9xxfoOhpD9ULwCHFOOBVrIKfAqpFozawcxhNy/OVGIyD/wkA2',
  # avatar_id: nil
  # jti: nil
)

# User.create(
#   name: 'Wilberth j',
#   description: 'odio react',
#   email: 'wilsi@gmail.com',
#   password: '12345678',
#   avatar: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-2271804793.jpg"
# )


# db/seeds.rb

Label.create( name: "Javascript", description: "JavaScript es un lenguaje de programación que los desarrolladores utilizan para hacer páginas web interactivas")
Label.create( name: "CSS", description: "CSS es una función que se agrega a HTML que proporciona tanto a los desarrolladores de sitios Web, así como a los usuarios, más control sobre cómo se muestran las páginas")



# Crear nuevas etiquetas
Label.create(
  name: "Ruby",
  description: "Ruby es un lenguaje de programación interpretado, reflexivo y orientado a objetos, diseñado y desarrollado en Japón"
)

Label.create(
  name: "React",
  description: "React es una biblioteca de JavaScript para construir interfaces de usuario. Es mantenido por Facebook y una comunidad de desarrolladores individuales y empresas"
)

Label.create(
  name: "Ruby on Rails",
  description: "Ruby on Rails, o Rails, es un marco de aplicación web de código abierto escrito en Ruby. Es un enfoque para el desarrollo de aplicaciones web que utiliza el modelo-vista-controlador"
)

Label.create(
  name: "Python",
  description: "Python es un lenguaje de programación de alto nivel, interpretado y de propósito general. Es conocido por su sintaxis clara y legible"
)


Label.create(
  name: "SQL",
  description: "SQL (Structured Query Language) es un lenguaje de programación especializado para administrar y recuperar información de sistemas de gestión de bases de datos relacionales"
)

Label.create(
  name: "NoSQL",
  description: "NoSQL es un término que se refiere a una amplia gama de sistemas de gestión de bases de datos que difieren del modelo de bases de datos relacionales tradicional"
)

Label.create(
  name: "MongoDB",
  description: "MongoDB es una base de datos NoSQL que utiliza documentos JSON con esquemas dinámicos. Es ampliamente utilizado para aplicaciones web modernas"
)

Label.create(
  name: "APIs",
  description: "Una Interfaz de Programación de Aplicaciones (API) permite la comunicación y la interacción entre diferentes servicios y aplicaciones de software"
)

Label.create(
  name: "DevOps",
  description: "DevOps es una cultura y un conjunto de prácticas que buscan automatizar y mejorar la colaboración entre el desarrollo de software y las operaciones de TI"
)

Label.create(
  name: "Microservicios",
  description: "La arquitectura de microservicios es un enfoque para desarrollar una aplicación como un conjunto de servicios pequeños, independientes y altamente modularizados"
)

# Agrega más etiquetas según sea necesario

puts "Seeds para etiquetas creados exitosamente!"
