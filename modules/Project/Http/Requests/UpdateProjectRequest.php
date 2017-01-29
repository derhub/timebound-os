<?php namespace TB\Project\Http\Requests;

use TB\Core\Http\Requests\Request;
use TB\Project\Entities\Project;

class UpdateProjectRequest extends Request
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return Project::$rules;
    }
}
