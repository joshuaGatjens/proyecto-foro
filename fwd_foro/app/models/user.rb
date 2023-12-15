
class User < ApplicationRecord
 # Include the devise modules for JWT authentication and revocation strategy
 include Devise::JWT::RevocationStrategies::JTIMatcher
 acts_as_voter
 rolify

 # Define the devise modules for user authentication and authorization
 devise :database_authenticatable,
         :registerable, :recoverable, :trackable,
         :rememberable, :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist

 # Define the associations for the user model
 has_one_attached :avatar
 has_many :likes, dependent: :destroy
 has_many :questions, dependent: :destroy
 has_many :answers, dependent: :destroy
 has_many :comments, dependent: :destroy


  has_many :attachments, as: :record, class_name: "ActiveStorage::Attachment"
  has_many :blobs, through: :attachments, class_name: "ActiveStorage::Blob"

 # Define the like_question method to like a question for the user
 def like_question(question)
    unless question_liked?(question)
      question.liked_by(self)
      question.update_question_points
    end
 end

 # Define the unquestion_liked method to unlike a question for the user
 def unquestion_liked(question)
    if question_liked?(question)
      question.unliked_by(self)
      question.update_question_points
    end
 end

 # Define the question_liked? method to check if a user has liked a question
 def question_liked?(question)
    voted_for?(question)
 end

#likes_answer
def like_answer(answer)
   unless answer_liked?(answer)
     answer.liked_by(self)
     answer.update_answer_points
   end
 end

 # Define the unlike_answer method to unlike an answer for the user
 def unlike_answer(answer)
   if answer_liked?(answer)
     answer.unliked_by(self)
     answer.update_answer_points
   end
 end

 # Define the answer_liked? method to check if a user has liked an answer
 def answer_liked?(answer)
   voted_for?(answer)
 end

end
#
#This code defines the `User` model with proper commenting. Comments have been added to clarify the purpose of each method and association. The code remains focused and concise, ensuring it is easy to understand and maintain..</s>