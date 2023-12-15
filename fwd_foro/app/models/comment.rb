class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :question, optional: true
  belongs_to :answer, optional: true
  belongs_to :commentable, polymorphic: true

  validates :body, presence: true


end