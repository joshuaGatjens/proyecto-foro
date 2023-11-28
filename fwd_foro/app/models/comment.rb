class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :question
    belongs_to :answer
  
    validates :body, presence: true
    # other validations or methods can be added as needed
  end
  