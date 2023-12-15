require 'rails_helper'

RSpec.describe Question, type: :model do
  it { should belong_to(:user) }
  it { should have_many(:answers).dependent(:destroy) }
  it { should have_and_belong_to_many(:labels) }
  it { should have_many(:comments).dependent(:destroy) }
  it { should have_many(:likes).dependent(:destroy) }

  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:body) }

  describe '#update_question_points' do
    let(:question) { create(:question) }

    before do
      create_list(:vote, 3, votable: question)
      question.update_question_points
    end


  end
end