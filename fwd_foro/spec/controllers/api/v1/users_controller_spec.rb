# spec/controllers/api/v1/users_controller_spec.rb
require 'rails_helper'
RSpec.describe Api::V1::UsersController, type: :controller do
  let(:user) { create(:user, name: 'Test User') }

  describe 'GET #show' do
    it 'returns the user data' do
      get :show, params: { id: user.id }
      expect(response.body).to include(user.name)
    end
  end



  describe 'PATCH #update' do
    it 'updates the user' do
      patch :update, params: { id: user.id, user: { name: 'Updated Name' } }
      user.reload
      expect(user.name).to eq('Updated Name')
    end
  end

  describe 'DELETE #destroy' do
    it 'deletes the user' do
      user_to_delete = create(:user)
      expect {
        delete :destroy, params: { id: user_to_delete.id }
      }.to change(User, :count).by(-1)
    end
  end
end