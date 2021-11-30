class ApplicationController < ActionController::Base
  rescue_from StandardError, with: :error500_redirect

  def error500_redirect(_exception = nil)
    redirect_to '/error500'
  end
end
