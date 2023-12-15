# config/routes.rb

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:update]
      resources :public_data, only: [:show, :index], controller: 'public_data'
      resources :achievements
      resources :users do
        member do
          patch :update_avatar
          get :questions
          get 'avatar', to: 'users#avatar'
        end
        collection do
        get 'users_more_active', to: 'users#users_more_active'
      end
      end
      resources :labels
      resources :questions do
          collection do
            get 'top_users'
            get 'users_by_more_questions'
          end
        member do
          post :toggle_like
        end
        resources :answers do
          member do
            post :toggle_like
          end
          resources :comments
        end
      end
        get 'labels/:label_id/questions', to: 'questions#by_label', as: 'questions_by_label'
        get 'answers/top_users', to: 'answers#top_users'
        get 'answers/users_by_more_answers', to: 'answers#users_by_more_answers' # Agrega esta línea
    end

  end

  devise_for :users,
    path: '',
    path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }

  devise_scope :user do
    get '/auth_status', to: 'users/sessions#auth_status'
  end
end
