
# spec/models/user_spec.rb
require 'rails_helper'

RSpec.describe User, type: :model do
  subject { FactoryBot.create(:user) }

  context 'Validations' do
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password) }
    it { should validate_uniqueness_of(:email).case_insensitive }

    it 'validates format of email' do
      subject.email = 'invalid_email'
      expect(subject).to_not be_valid
      expect(subject.errors[:email]).to include('is invalid')
    end

    it 'validates length of password' do
      subject.password = 'short'
      expect(subject).to_not be_valid
      expect(subject.errors[:password]).to include('is too short (minimum is 6 characters)')
    end
  end

  context 'Associations' do
    it { should have_many(:answers).dependent(:destroy) }
    it { should have_many(:questions).dependent(:destroy) }

    it 'deletes associated answers when deleted' do
      answer = FactoryBot.create(:answer, user: subject)
      subject.destroy
      expect { Answer.find(answer.id) }.to raise_error(ActiveRecord::RecordNotFound)
    end

    it 'deletes associated questions when deleted' do
      question = FactoryBot.create(:question, user: subject)
      subject.destroy
      expect { Question.find(question.id) }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end

  describe 'Devise modules' do
    it 'is devise authenticatable' do
      expect(subject).to respond_to(:valid_password?)
    end

    it 'is devise registerable' do
      expect(subject).to respond_to(:update_without_password)
    end

    it 'authenticates with valid credentials' do
      expect(subject.valid_password?(subject.password)).to be true
    end

    it 'does not authenticate with invalid credentials' do
      expect(subject.valid_password?('invalid_password')).to be false
    end
  end
end
