class ApiController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :null_session
  # after_filter :set_csrf_cookie_for_ng
  respond_to :json

  rescue_from ActionController::InvalidAuthenticityToken do |exception|
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
    render :error => 'invalid token', :status => :unprocessable_entity
  end

  skip_before_action :form_authenticity_token, if: :json_request?

  # def set_csrf_cookie_for_ng
  #   p current_user, '*********'
  #   cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  # end

  protected

  def verified_request?
    super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
  end

  def json_request?
    request.format.json?
  end
end
