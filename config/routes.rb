Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :boards, only: [:index, :show, :create, :destroy]
    resources :lists, only: [:index, :show, :create, :destroy, :update]
    resources :cards, only: [:index, :show, :create, :destroy, :update]
  end
  root "static_pages#index"
end
