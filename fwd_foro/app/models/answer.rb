class Answer < ApplicationRecord
    belongs_to :user
    belongs_to :question
    has_many :comments, dependent: :destroy
  
    validates :body, presence: true
    # other validations or methods can be added as needed
  end
  