class Question < ApplicationRecord
  acts_as_votable
    belongs_to :user
    has_many :answers, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_and_belongs_to_many :labels
    validates :title, presence: true
    validates :body, presence: true

    has_many :likes, dependent: :destroy
    def update_question_points
      update(question_points: votes_for.size)
    end
  end
  