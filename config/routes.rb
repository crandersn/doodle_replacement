Rails.application.routes.draw do
  devise_for :admins
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  devise_scope :admin do
    root to: "devise/sessions#new"
    # delete "/users/sign_out" => "devise/sessions#destroy"

  end

  # admin homepage
  get 'admin/homepage', as: :admin_root
  get 'admin/start' => 'admin#start'
  get 'admin/end' => 'admin#end'
  get 'admin/delete' => 'admin#delete'
  get 'admin/new' => 'admin#new'
  get 'admin/edit' => 'admin#edit'
  get 'admin/invite' => 'admin#invite'
  get 'admin/delete_invitee' => 'admin#delete_invitee'
  get 'admin/add_invitee' => 'admin#add_invitee'
  get 'admin/send_invites' => 'admin#send_invites'
  get 'admin/log_out' => 'admin#log_out'


  # define poll controller routes
  get 'poll/new' => 'poll#new'
  get 'poll/edit' => 'poll#edit'
  post 'poll/edit_time_slots' => 'poll#edit_time_slots'
  post 'poll/update' => 'poll#update'
  post 'poll/choose_time_slots' => 'poll#choose_time_slots'
  post 'poll/create' => 'poll#create'
  get 'poll/vote' => "poll#vote"
  post 'poll/cast_vote' => "poll#cast_vote"
  get 'poll/success' => "poll#success"
  get 'poll/unauthorized' => "poll#unauthorized"

  # poll results page
  get 'results/get_results' => 'results#get_results'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
