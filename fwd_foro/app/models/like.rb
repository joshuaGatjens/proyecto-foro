class Like < ApplicationRecord
  belongs_to :user
  belongs_to :question

  validates :user_id, presence: true, uniqueness: { scope: :question_id, message: "Solo se permite un like por usuario y pregunta" }
  validates :question_id, presence: true
end