Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :public_data, only: [:show, :index], controller: 'public_data'
      resources :achievements
      resources :users
      resources :answers
      resources :comments
      resources :labels
     resources :questions do
        member do
          post 'toggle_like'
        end
      end # Cierre del bloque `resources :questions`
    end  # Cierre del bloque `namespace :v1`
  end  # Cierre del bloque `namespace :api`
  # get 'private/test'
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
end  # Cierre del bloque `Rails.application.routes.draw`
