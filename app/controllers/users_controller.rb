class UsersController < ApplicationController
  def sign_in
    user = User.search(params[:name], params[:password])
    session[:user] = user
    render json: { user: user }
  end

  def  signed_in
    render json: { user: session[:user] }
  end

  def sign_out
  end
end
