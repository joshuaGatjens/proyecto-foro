class Answer < ApplicationRecord

  belongs_to :user
    belongs_to :question
    has_many :comments, as: :commentable, dependent: :destroy
    validates :body, presence: true
    acts_as_votable
    def update_answer_points
      update(answer_points: votes_for.size)
    end
  
  end
  