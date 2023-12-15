# spec/controllers/api/v1/questions_controller_spec.rb
require 'rails_helper'

RSpec.describe Api::V1::QuestionsController, type: :controller do
  let(:user) { create(:user) }
  let(:question) { create(:question, user: user) }

  describe 'GET #show' do
    it 'returns the question data' do
      get :show, params: { id: question.id }
      expect(response.body).to include(question.title)
    end
  end

  describe 'POST #create' do
    it 'creates a new question' do
      expect {
        post :create, params: { question: { title: 'New Question', body: 'Question body', user_id: user.id } }
      }.to change(Question, :count).by(1)
    end
  end

  describe 'PUT #update' do
    it 'updates the question' do
      put :update, params: { id: question.id, question: { title: 'Updated Question' } }
      question.reload
      expect(question.title).to eq('Updated Question')
    end
  end

  describe 'DELETE #destroy' do
    it 'deletes the question' do
      question
      expect {
        delete :destroy, params: { id: question.id }
      }.to change(Question, :count).by(-1)
    end
  end

  describe 'GET #users_by_more_questions' do
    it 'returns users ordered by the number of questions' do
      get :users_by_more_questions
      expect(response.status).to eq(200)
    end
  end
end