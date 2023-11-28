class ApplicationController < ActionController::API
  respond_to :json
  rescue_from ActionController::InvalidAuthenticityToken, with: :render_unauthorized
  before_action :configure_permitted_parameters, if: :devise_controller?
  include ActionController::HttpAuthentication::Token::ControllerMethods

  before_action :authenticate_user!

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name avatar])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[name avatar])
  end

private

end
